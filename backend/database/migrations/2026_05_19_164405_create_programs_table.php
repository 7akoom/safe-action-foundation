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
        Schema::create('programs', function (Blueprint $table) {
            $table->id();

            // Content
            $table->string('title_en');
            $table->string('title_ar');

            $table->string('slug')->unique();

            $table->text('short_description_en')->nullable();
            $table->text('short_description_ar')->nullable();

            $table->longText('description_en')->nullable();
            $table->longText('description_ar')->nullable();

            // Media
            $table->string('featured_image')->nullable();
            $table->string('icon')->nullable();

            // Display
            $table->unsignedInteger('sort_order')->default(0);

            // Status
            $table->boolean('is_published')->default(true);
            $table->timestamp('published_at')->nullable();

            // SEO
            $table->string('seo_title_en')->nullable();
            $table->string('seo_title_ar')->nullable();

            $table->text('seo_description_en')->nullable();
            $table->text('seo_description_ar')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('programs');
    }
};
