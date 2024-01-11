<?php

namespace App\DataFixtures;

use App\Entity\Role;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private $userPasswordHashed;

    public function __construct(UserPasswordHasherInterface $userPasswordHashed)
    {
      $this->userPasswordHashed = $userPasswordHashed;
    }
    public function load(ObjectManager $manager): void
    {

        $role = new Role();
        $role->setRole('admin');
        $manager->persist($role);

        $user = new User();
        $user->setMail('user@booapi.com');
        $user->setName('Nalvac');
        $user->setCity('Lyon');
        $user->setLand('Villeurbanne');
        $user->setRoles($role);
        $user->setPhone('546545464');
        $user->setZipCode('66926');
        $user->setAdress('46 rue simone veil');
        $user->setPassword($this->userPasswordHashed->hashPassword($user, 'password'));
        $manager->persist($user);

        $manager->flush();
    }
}
