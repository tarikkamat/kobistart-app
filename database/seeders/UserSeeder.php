<?php

namespace Database\Seeders;

use App\Enums\Role;
use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Tarık KAMAT',
                'email' => 'tarik.kamat@kobistart.com',
                'password' => 'password',
                'role' => Role::SUPER_ADMIN,
            ],
        ];

        foreach ($users as $user) {
            User::firstOrCreate($user);
        }
    }
}
