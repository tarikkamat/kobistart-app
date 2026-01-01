<?php

namespace App\Enums;

enum Role: string
{
    case USER = 'user';
    case AGENCY = 'agency';
    case SUPER_ADMIN = 'super_admin';

    public function label(): string
    {
        return match ($this) {
            self::USER => 'User',
            self::AGENCY => 'Agency',
            self::SUPER_ADMIN => 'Super Admin',
        };
    }

    public function value(): string
    {
        return match ($this) {
            self::USER => 'user',
            self::AGENCY => 'agency',
            self::SUPER_ADMIN => 'super_admin',
        };
    }
}
