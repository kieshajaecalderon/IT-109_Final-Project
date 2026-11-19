<?php

namespace App\Services;

use InvalidArgumentException;

class PaymentAmountService
{
    /**
     * Convert Philippine pesos to centavos.
     */
    public function toCentavos(string|int|float $amount): int
    {
        if (!is_numeric($amount)) {
            throw new InvalidArgumentException(
                'Payment amount must be numeric.'
            );
        }

        $amountInPesos = (float) $amount;

        if (!is_finite($amountInPesos) || $amountInPesos <= 0) {
            throw new InvalidArgumentException(
                'Payment amount must be greater than zero.'
            );
        }

        // Reject amounts with more than two decimal places.
        if (round($amountInPesos, 2) !== $amountInPesos) {
            throw new InvalidArgumentException(
                'Payment amount cannot have more than two decimal places.'
            );
        }

        return (int) round($amountInPesos * 100);
    }
}
