<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(30)->create();

        User::create([
            'name' => 'wahyu',
            'email' => 'wahyu@gmail.com',
            'password' => Hash::make('wahyu123'),
            'role' => 'admin'
        ]);

        User::create([
            'name' => 'wahyu2',
            'email' => 'wahyu2@gmail.com',
            'password' => Hash::make('wahyu123'),
            'role' => 'student'
        ]);
    }
}
