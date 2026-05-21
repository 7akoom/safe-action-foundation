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
        Schema::table('settings', function (Blueprint $table) {

            // About Section
            $table->string('about_title_en')->nullable();
            $table->string('about_title_ar')->nullable();

            $table->text('about_description_en')->nullable();
            $table->text('about_description_ar')->nullable();

            // Mission
            $table->string('mission_title_en')->nullable();
            $table->string('mission_title_ar')->nullable();

            $table->text('mission_description_en')->nullable();
            $table->text('mission_description_ar')->nullable();

            // Vision
            $table->string('vision_title_en')->nullable();
            $table->string('vision_title_ar')->nullable();

            $table->text('vision_description_en')->nullable();
            $table->text('vision_description_ar')->nullable();

            // Statistics
            $table->unsignedInteger('beneficiaries_count')->default(0);
            $table->unsignedInteger('programs_count')->default(0);
            $table->unsignedInteger('volunteers_count')->default(0);
            $table->unsignedInteger('partners_count')->default(0);

            // About Media
            $table->string('about_image')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('settings', function (Blueprint $table) {

            $table->dropColumn([
                'about_title_en',
                'about_title_ar',

                'about_description_en',
                'about_description_ar',

                'mission_title_en',
                'mission_title_ar',

                'mission_description_en',
                'mission_description_ar',

                'vision_title_en',
                'vision_title_ar',

                'vision_description_en',
                'vision_description_ar',

                'beneficiaries_count',
                'programs_count',
                'volunteers_count',
                'partners_count',

                'about_image',
            ]);
        });
    }
};
