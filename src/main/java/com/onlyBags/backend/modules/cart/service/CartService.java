package com.onlyBags.backend.modules.cart.service;

import com.onlyBags.backend.modules.cart.dto.CartResponse;
import com.onlyBags.backend.modules.cart.dto.CartResponse.CartItemResponse;
import com.onlyBags.backend.modules.cart.entity.Cart;
import com.onlyBags.backend.modules.cart.entity.CartItem;
import com.onlyBags.backend.modules.cart.exception.CartNotFoundException;
import com.onlyBags.backend.modules.cart.exception.InvalidQuantityException;
import com.onlyBags.backend.modules.cart.repository.CartItemRepository;
import com.onlyBags.backend.modules.cart.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    // ------------------------------------------------------------------ create
    @Transactional
    public CartResponse createCart(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder().userId(userId).build()
                ));
        return toResponse(cart);
    }

    // -------------------------------------------------------------------- read
    @Transactional(readOnly = true)
    public CartResponse getCartByUserId(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(
                        "Cart not found for userId: " + userId));
        return toResponse(cart);
    }

    // ---------------------------------------------------------------- add item
    @Transactional
    public CartResponse addItemToCart(UUID userId, UUID productId, int quantity, BigDecimal price) {
        validateQuantity(quantity);

        Cart cart = cartRepository.findByUserId(userId)
                .orElseGet(() -> cartRepository.save(
                        Cart.builder().userId(userId).build()
                ));

        // If the same product already exists in cart, update quantity instead of duplicating
        CartItem existingItem = cart.getItems().stream()
                .filter(item -> item.getProductId().equals(productId))
                .findFirst()
                .orElse(null);

        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
            existingItem.setPrice(price); // update to latest price snapshot
        } else {
            CartItem newItem = CartItem.builder()
                    .productId(productId)
                    .quantity(quantity)
                    .price(price)
                    .build();
            cart.addItem(newItem);
        }

        cartRepository.save(cart);
        return toResponse(cart);
    }

    // ------------------------------------------------------------- update item
    @Transactional
    public CartResponse updateCartItem(UUID cartItemId, int quantity) {
        validateQuantity(quantity);

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartNotFoundException(
                        "Cart item not found: " + cartItemId));

        item.setQuantity(quantity);
        cartItemRepository.save(item);

        return toResponse(item.getCart());
    }

    // ------------------------------------------------------------- remove item
    @Transactional
    public CartResponse removeCartItem(UUID cartItemId) {
        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartNotFoundException(
                        "Cart item not found: " + cartItemId));

        Cart cart = item.getCart();
        cart.removeItem(item);
        cartItemRepository.delete(item);

        return toResponse(cart);
    }

    // ------------------------------------------------------------- clear cart
    @Transactional
    public void clearCart(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId)
                .orElseThrow(() -> new CartNotFoundException(
                        "Cart not found for userId: " + userId));

        cart.clearItems();
        cartRepository.save(cart);
    }

    // ====================================================================
    //  PRIVATE HELPERS
    // ====================================================================

    private void validateQuantity(int quantity) {
        if (quantity < 1) {
            throw new InvalidQuantityException(
                    "Quantity must be at least 1, but was: " + quantity);
        }
    }

    /**
     * Maps a Cart entity → CartResponse DTO.
     */
    private CartResponse toResponse(Cart cart) {
        List<CartItemResponse> itemDtos = cart.getItems().stream()
                .map(this::toItemResponse)
                .toList();

        BigDecimal total = itemDtos.stream()
                .map(CartItemResponse::getSubtotal)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return CartResponse.builder()
                .cartId(cart.getId())
                .userId(cart.getUserId())
                .items(itemDtos)
                .totalPrice(total)
                .createdAt(cart.getCreatedAt())
                .updatedAt(cart.getUpdatedAt())
                .build();
    }

    private CartItemResponse toItemResponse(CartItem item) {
        return CartItemResponse.builder()
                .cartItemId(item.getId())
                .productId(item.getProductId())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .subtotal(item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity())))
                .createdAt(item.getCreatedAt())
                .updatedAt(item.getUpdatedAt())
                .build();
    }
}
