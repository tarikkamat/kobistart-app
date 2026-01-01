<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wizard_analyses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained('users')->onDelete('cascade');
            $table->string('session_id')->nullable();
            $table->json('wizard_data'); // Wizard form verileri
            $table->json('analysis_result'); // Agent yanıtı
            $table->foreignId('platform_id')->nullable()->constrained('platforms')->onDelete('set null');
            $table->foreignId('plan_id')->nullable()->constrained('plans')->onDelete('set null');
            $table->integer('score')->default(0); // Uyum skoru (0-100)
            $table->string('confidence')->default('medium'); // high, medium, low
            $table->timestamps();
            $table->softDeletes();

            $table->index(['user_id']);
            $table->index(['session_id']);
            $table->index(['created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wizard_analyses');
    }
};

