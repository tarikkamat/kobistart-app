<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\odel=Comment>
 */
class CommentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => 1,
            'platform_id' => rand(1, 2),
            'comment' => \fake()->text(),
            'rating' => \fake()->randomFloat(1, 1, 5),
            'status' => \fake()->boolean(),
        ];
    }
}
