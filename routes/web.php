<?php

use App\Http\Controllers\StudentController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'auth/login')->name('home');

Route::apiResource('students', StudentController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::get('platform/students', [StudentController::class, 'platform'])->name('students.platform');
    Route::post('platform/students', [StudentController::class, 'platformStore'])->name('students.add');
});

require __DIR__.'/settings.php';
