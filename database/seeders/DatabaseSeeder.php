<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\Student;
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

        User::create([
            'id' => 1,
            'name' => 'wahyu',
            'email' => 'wahyu@gmail.com',
            'password' => Hash::make('wahyu123'),
            'role' => 'admin'
        ]);

        User::create([
            'id' => 2,
            'name' => 'wahyu2',
            'email' => 'wahyu2@gmail.com',
            'password' => Hash::make('wahyu123'),
            'role' => 'student'
        ]);

        Student::create([
            'user_id' => 2,
            'NIS' => 2123917298,
            'grade' => 'XI RPL 2'
        ]);

        User::factory(30)->create();

        $category = [
            ['category_name' => 'Perlengkapan Kelas'],
            ['category_name' => 'Perlengkapan Ruang Guru'],
            ['category_name' => 'Perlengkapan Lab'],
            ['category_name' => 'Perlengkapan Bengkel'],
            ['category_name' => 'Perlengkapan Toilet'],
        ];

        foreach ($category as $cat) {
            Category::create($cat);
        }
    }
}
