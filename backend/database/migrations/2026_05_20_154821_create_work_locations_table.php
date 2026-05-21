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
        Schema::create('work_locations', function (Blueprint $table) {
            $table->id();

            $table->string('name_en');
            $table->string('name_ar');

            $table->text('description_en')->nullable();
            $table->text('description_ar')->nullable();

            $table->string('country_en')->nullable();
            $table->string('country_ar')->nullable();

            $table->string('city_en')->nullable();
            $table->string('city_ar')->nullable();

            $table->string('featured_image')->nullable();

            $table->unsignedInteger('sort_order')->default(0);

            $table->boolean('is_active')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_locations');
    }
};
