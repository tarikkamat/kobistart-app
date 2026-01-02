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
        Schema::create('comparisons', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->foreignId('plan1_id')->constrained('plans')->onDelete('cascade');
            $table->foreignId('plan2_id')->constrained('plans')->onDelete('cascade');
            $table->json('plan1_data'); // Plan ve platform bilgileri
            $table->json('plan2_data'); // Plan ve platform bilgileri
            $table->json('comparison_data'); // Özellik karşılaştırması sonuçları
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->softDeletes();

            // Aynı kullanıcı için aynı plan kombinasyonunu önlemek için unique index
            $table->unique(['user_id', 'plan1_id', 'plan2_id']);
            $table->index(['user_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('comparisons');
    }
};
