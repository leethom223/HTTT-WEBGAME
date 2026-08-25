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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->string('title', 200);
            $table->string('slug', 200)->unique();
            $table->string('thumbnail', 255);
            $table->text('play_url');
            $table->text('description')->nullable();
            $table->string('controls_guide', 255)->nullable();
            $table->unsignedBigInteger('play_count')->default(0);
            $table->decimal('rating_avg', 3, 2)->default(5.00);
            $table->enum('badge', ['HOT', 'NEW', 'WEBGL', 'NORMAL'])->default('NORMAL');
            $table->enum('status', ['published', 'draft', 'hidden'])->default('published');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
