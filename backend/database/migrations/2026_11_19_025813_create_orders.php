
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id();

            $table->foreignId('user_id')
                ->constrained('users')
                ->restrictOnDelete();

            $table->foreignId('canteen_id')
                ->constrained('canteens')
                ->restrictOnDelete();

            $table->string('order_number')->unique();

            $table->decimal('subtotal', 10, 2);

            $table->decimal('runner_fee', 10, 2)->default(5.00);

            $table->decimal('total_amount', 10, 2);

            $table->string('status')->default('pending');

            $table->string('delivery_building');

            $table->string('delivery_room')->nullable();

            $table->text('delivery_instructions')->nullable();

            $table->timestamps();

            $table->index(['user_id', 'status']);
            $table->index(['canteen_id', 'status']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
