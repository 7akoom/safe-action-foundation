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
        Schema::create('careers', function (Blueprint $table) {
            $table->id();

            $table->string('title_en');
            $table->string('title_ar');

            $table->string('slug')->unique();

            $table->string('location_en')->nullable();
            $table->string('location_ar')->nullable();

            $table->string('employment_type_en')->nullable();
            $table->string('employment_type_ar')->nullable();

            $table->string('department_en')->nullable();
            $table->string('department_ar')->nullable();

            $table->text('short_description_en')->nullable();
            $table->text('short_description_ar')->nullable();

            $table->longText('description_en')->nullable();
            $table->longText('description_ar')->nullable();

            $table->longText('requirements_en')->nullable();
            $table->longText('requirements_ar')->nullable();

            $table->string('apply_email')->nullable();
            $table->string('apply_url')->nullable();

            $table->date('deadline')->nullable();

            $table->boolean('is_published')->default(true);

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
        Schema::dropIfExists('careers');
    }
};
