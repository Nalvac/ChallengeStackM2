<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use App\Controller\CommandController;


#[ApiResource(operations: [
  new Get(
    uriTemplate: '/command/{id}',
    controller: CommandController::class,
    description: 'Get Command by Officine',
    name: 'get_command_officine'
  ),
])]
class Command
{
  // TODO: add properties and methods to make Doc on apiplatform
}
