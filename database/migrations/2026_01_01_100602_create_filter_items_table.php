<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('filter_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('filter_group_id')->constrained('filter_groups')->onDelete('cascade');
            $table->foreignId('feature_id')->nullable()->constrained('features')->onDelete('cascade');
            $table->string('feature_key')->nullable(); // FeatureKey enum value
            $table->string('name');
            $table->integer('order')->default(0);
            $table->boolean('status')->default(true);
            $table->timestamps();

            // Ensure either feature_id or feature_key is set
            $table->index(['filter_group_id', 'status']);
            $table->index(['feature_id']);
            $table->index(['feature_key']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filter_items');
    }
};
