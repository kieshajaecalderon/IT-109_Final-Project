<?php

namespace App\Services;

use InvalidArgumentException;

class OrderPricingService
{
    /**
     * Calculate order subtotal, runner fee, and total.
     *
     * Prices are in Philippine pesos.
     */
    public function calculate(array $items, float $runnerFee = 5.00): array
    {
        if ($runnerFee < 5.00 || $runnerFee > 10.00) {
            throw new InvalidArgumentException(
                'Runner fee must be between ₱5.00 and ₱10.00.'
            );
        }

        $subtotalInCentavos = 0;

        foreach ($items as $item) {
            $quantity = (int) $item['quantity'];

            $unitPriceInCentavos = (int) round(
                (float) $item['unit_price'] * 100
            );

            if ($quantity < 1 || $quantity > 99) {
                throw new InvalidArgumentException(
                    'Item quantity must be between 1 and 99.'
                );
            }

            if ($unitPriceInCentavos < 0) {
                throw new InvalidArgumentException(
                    'Item price cannot be negative.'
                );
            }

            $subtotalInCentavos += $unitPriceInCentavos * $quantity;
        }

        $runnerFeeInCentavos = (int) round($runnerFee * 100);

        $totalInCentavos = $subtotalInCentavos + $runnerFeeInCentavos;

        return [
            'subtotal' => number_format($subtotalInCentavos / 100, 2, '.', ''),
            'runner_fee' => number_format($runnerFeeInCentavos / 100, 2, '.', ''),
            'total_amount' => number_format($totalInCentavos / 100, 2, '.', ''),
            'total_in_centavos' => $totalInCentavos,
        ];
    }
}
