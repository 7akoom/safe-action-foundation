<?php

use App\Http\Controllers\Api\HomeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProgramController;
use App\Http\Controllers\Api\ContactMessageController;
use App\Http\Controllers\Api\WorkLocationController;
use App\Http\Controllers\Api\NewsController;
use App\Http\Controllers\Api\CareerController;


Route::get('/home', [HomeController::class, 'index']);

Route::get('/programs/{slug}', [ProgramController::class, 'show']);

Route::post('/contact-messages', [ContactMessageController::class, 'store']);

Route::get('/work-locations', [WorkLocationController::class, 'index']);

Route::get('/news', [NewsController::class, 'index']);
Route::get('/news/{slug}', [NewsController::class, 'show']);

Route::get('/careers', [CareerController::class, 'index']);
Route::get('/careers/{slug}', [CareerController::class, 'show']);
