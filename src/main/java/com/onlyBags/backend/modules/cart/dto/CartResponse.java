package com.onlyBags.backend.modules.cart.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartResponse {

    private UUID cartId;
    private UUID userId;
    private List<CartItemResponse> items;
    private BigDecimal totalPrice;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Data
    @Builder
    @AllArgsConstructor
    @NoArgsConstructor
    public static class CartItemResponse {
        private UUID cartItemId;
        private UUID productId;
        private int quantity;
        private BigDecimal price;
        private BigDecimal subtotal;
        private LocalDateTime createdAt;
        private LocalDateTime updatedAt;
    }
}
