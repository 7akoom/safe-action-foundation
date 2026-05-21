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
        Schema::create('settings', function (Blueprint $table) {
            $table->id();

            // Organization Info
            $table->string('organization_name_en');
            $table->string('organization_name_ar');

            $table->string('tagline_en')->nullable();
            $table->string('tagline_ar')->nullable();

            // Contact
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('location_en')->nullable();
            $table->string('location_ar')->nullable();

            // Social Links
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();

            // Media
            $table->string('logo')->nullable();
            $table->string('favicon')->nullable();

            // SEO
            $table->string('seo_title_en')->nullable();
            $table->string('seo_title_ar')->nullable();

            $table->text('seo_description_en')->nullable();
            $table->text('seo_description_ar')->nullable();

            // Home Hero
            $table->string('hero_title_en')->nullable();
            $table->string('hero_title_ar')->nullable();

            $table->text('hero_description_en')->nullable();
            $table->text('hero_description_ar')->nullable();

            $table->string('hero_image')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('settings');
    }
};
