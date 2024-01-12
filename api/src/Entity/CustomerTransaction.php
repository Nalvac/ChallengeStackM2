<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Delete;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\Controller\TensionVaccinController;
use App\Repository\CustomerTransactionRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: CustomerTransactionRepository::class)]
#[ApiResource(operations: [
  new Get(),
  new GetCollection(),
  new Get(
    uriTemplate: '/best/vaccin',
    controller: TensionVaccinController::class,
    description: 'Get the best vaccin',
    normalizationContext: ['groups' => ['getCustomerTransaction']],
    name: 'get_tension_vaccin'
  ),
  new Post(),
  new Post(
    uriTemplate: '/tension/vaccin',
    controller: TensionVaccinController::class,
    description: 'Get Vaccin by Years',
    name: 'get_tension_vaccin'
  ),
  new Post(
    uriTemplate: '/localisation/vaccin',
    controller: TensionVaccinController::class,
    description: 'Get Vaccin by Localisation',
    name: 'get_localisation_vaccin'
  ),
  new Post(
    uriTemplate: '/localisation/best/vaccin',
    controller: TensionVaccinController::class,
    description: 'Get Best Vaccin by Localisation',
    name: 'get_localisation_best_vaccin'
  ),
  new Put(),
  new Delete()
],
normalizationContext: ['groups' => ['getCustomerTransaction']],
)]
class CustomerTransaction
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getCustomerTransaction'])]
    private ?int $id = null;

    #[ORM\Column]
    #[Groups(['getCustomerTransaction'])]
    private ?int $quantity = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['getCustomerTransaction'])]
    private ?\DateTimeInterface $deliveryDate = null;

    #[ORM\ManyToOne(inversedBy: 'customerTransactions')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    #[Groups(['getCustomerTransaction'])]
    private ?ProductBatch $productBatch = null;

    #[ORM\ManyToOne(inversedBy: 'customerTransactions')]
    #[ORM\JoinColumn(nullable: true, onDelete: 'SET NULL')]
    #[Groups(['getCustomerTransaction'])]
    private ?User $user = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;

        return $this;
    }

    public function getDeliveryDate(): ?\DateTimeInterface
    {
        return $this->deliveryDate;
    }

    public function setDeliveryDate(\DateTimeInterface $deliveryDate): static
    {
        $this->deliveryDate = $deliveryDate;

        return $this;
    }

    public function getProductBatch(): ?ProductBatch
    {
        return $this->productBatch;
    }

    public function setProductBatch(?ProductBatch $productBatch): static
    {
        $this->productBatch = $productBatch;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;

        return $this;
    }
}
