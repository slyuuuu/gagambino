<?php

use App\Models\Student;
use App\Models\User;

test('guests are redirected from the students platform', function () {
    $response = $this->get(route('students.platform'));

    $response->assertRedirect(route('login'));
});

test('authenticated users can view students alphabetically by first name', function () {
    $user = User::factory()->create();
    $zane = Student::factory()->create(['first_name' => 'Zane', 'last_name' => 'Adams']);
    $ada = Student::factory()->create(['first_name' => 'Ada', 'last_name' => 'Smith']);
    $alex = Student::factory()->create(['first_name' => 'Alex', 'last_name' => 'Brown']);

    $response = $this->actingAs($user)->get(route('students.platform'));

    $response->assertOk();
    $response->assertInertia(fn ($page) => $page
        ->component('students/index')
        ->has('students', 3)
        ->where('students.0.id', $ada->id)
        ->where('students.1.id', $alex->id)
        ->where('students.2.id', $zane->id));
});

test('authenticated users can add a student from the platform', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('students.add'), [
        'first_name' => 'Ada',
        'last_name' => 'Lovelace',
        'birthday' => '1815-12-10',
        'email' => 'ada@example.com',
        'program' => 'BSCS',
        'gender' => 'Female',
        'year_level' => 4,
    ]);

    $response->assertRedirect(route('students.platform'));
    $this->assertDatabaseHas('students', [
        'email' => 'ada@example.com',
        'first_name' => 'Ada',
        'last_name' => 'Lovelace',
    ]);
});
