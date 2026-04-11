<?php

namespace Database\Seeders;

use App\Models\Admin;
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
            'password' => Hash::make('wahyu1233'),
            'role' => 'admin'
        ]);

        User::create([
            'id' => 2,
            'name' => 'wahyu2',
            'email' => 'wahyu2@gmail.com',
            'password' => Hash::make('wahyu1234'),
            'role' => 'student'
        ]);

        Student::create([
            'user_id' => 2,
            'nis' => 1234567890,
            'grade' => 'XI RPL 2'
        ]);

        Admin::create([
            'user_id' => 1,
            'nip' => 1234567890
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
