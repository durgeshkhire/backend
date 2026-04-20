package com.onlyBags.backend.modules.cart.controller;

import com.onlyBags.backend.modules.cart.dto.AddToCartRequest;
import com.onlyBags.backend.modules.cart.dto.CartResponse;
import com.onlyBags.backend.modules.cart.dto.UpdateCartItemRequest;
import com.onlyBags.backend.modules.cart.service.CartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    /**
     * POST /api/cart/add
     * Add an item to the user's cart (creates the cart if it doesn't exist).
     */
    @PostMapping("/add")
    public ResponseEntity<CartResponse> addToCart(
            @Valid @RequestBody AddToCartRequest request) {

        CartResponse response = cartService.addItemToCart(
                request.getUserId(),
                request.getProductId(),
                request.getQuantity(),
                request.getPrice()
        );
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    /**
     * GET /api/cart/{userId}
     * Retrieve the cart for the given user.
     */
    @GetMapping("/{userId}")
    public ResponseEntity<CartResponse> getCart(@PathVariable UUID userId) {
        return ResponseEntity.ok(cartService.getCartByUserId(userId));
    }

    /**
     * PUT /api/cart/item/{cartItemId}
     * Update quantity of a specific cart item.
     */
    @PutMapping("/item/{cartItemId}")
    public ResponseEntity<CartResponse> updateCartItem(
            @PathVariable UUID cartItemId,
            @Valid @RequestBody UpdateCartItemRequest request) {

        return ResponseEntity.ok(
                cartService.updateCartItem(cartItemId, request.getQuantity()));
    }

    /**
     * DELETE /api/cart/item/{cartItemId}
     * Remove a specific item from the cart.
     */
    @DeleteMapping("/item/{cartItemId}")
    public ResponseEntity<CartResponse> removeCartItem(
            @PathVariable UUID cartItemId) {

        return ResponseEntity.ok(cartService.removeCartItem(cartItemId));
    }

    /**
     * DELETE /api/cart/clear/{userId}
     * Remove all items from the user's cart.
     */
    @DeleteMapping("/clear/{userId}")
    public ResponseEntity<Void> clearCart(@PathVariable UUID userId) {
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }
}
