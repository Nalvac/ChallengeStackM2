<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Attribute\Groups;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
  normalizationContext: ['groups' => ['getUsers']],
)]
class User
{
  #[ORM\Id]
  #[ORM\GeneratedValue]
  #[ORM\Column]
  #[Groups(['getUsers'])]
  private ?int $id = null;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers', 'getProductBatch'])]
  private ?string $name = null;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers'])]
  private ?string $mail = null;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers'])]
  private ?string $phone = null;

  #[ORM\Column]
  #[Groups(['getUsers'])]
  private ?string $zip_code = null;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers'])]
  private ?string $city = null;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers'])]
  private ?string $adress = null;

  #[ORM\Column(length: 255, nullable: true)]
  #[Groups(['getUsers'])]
  private ?string $password = null;

  #[ORM\ManyToOne(inversedBy: 'user')]
  #[ORM\JoinColumn(nullable: false)]
  #[Groups(['getUsers'])]
  private ?Role $roles = null;

  #[ORM\OneToMany(mappedBy: 'user', targetEntity: ProductBatch::class)]
  private Collection $productBatches;

  #[ORM\Column(length: 255)]
  #[Groups(['getUsers'])]
  private ?string $land = null;

  #[ORM\OneToMany(mappedBy: 'user', targetEntity: CustomerTransaction::class)]
  private Collection $customerTransactions;

  public function __construct()
  {
    $this->productBatches = new ArrayCollection();
    $this->customerTransactions = new ArrayCollection();
  }

  public function getId(): ?int
  {
    return $this->id;
  }

  public function getName(): ?string
  {
    return $this->name;
  }

  public function getUsername(): string {
    return $this->getName();
  }

  public function setName(string $name): static
  {
    $this->name = $name;

    return $this;
  }

  public function getMail(): ?string
  {
    return $this->mail;
  }

  public function setMail(string $mail): static
  {
    $this->mail = $mail;

    return $this;
  }

  public function getPhone(): ?string
  {
    return $this->phone;
  }

  public function setPhone(string $phone): static
  {
    $this->phone = $phone;

    return $this;
  }

  public function getZipCode(): ?string
  {
    return $this->zip_code;
  }

  public function setZipCode(string $zip_code): static
  {
    $this->zip_code = $zip_code;

    return $this;
  }

  public function getCity(): ?string
  {
    return $this->city;
  }

  public function setCity(string $city): static
  {
    $this->city = $city;

    return $this;
  }

  public function getAdress(): ?string
  {
    return $this->adress;
  }

  public function setAdress(string $adress): static
  {
    $this->adress = $adress;

    return $this;
  }

  public function getPassword(): ?string
  {
    return $this->password;
  }

  public function setPassword(?string $password): static
  {
    $this->password = $password;

    return $this;
  }

  public function getRoles(): ?role
  {
    return $this->roles;
  }

  public function setRoles(?role $roles): static
  {
    $this->roles = $roles;

    return $this;
  }

  /**
   * @return Collection<int, ProductBatch>
   */
  public function getProductBatches(): Collection
  {
    return $this->productBatches;
  }

  public function addProductBatch(ProductBatch $productBatch): static
  {
    if (!$this->productBatches->contains($productBatch)) {
      $this->productBatches->add($productBatch);
      $productBatch->setUser($this);
    }

    return $this;
  }

  public function removeProductBatch(ProductBatch $productBatch): static
  {
    if ($this->productBatches->removeElement($productBatch)) {
      // set the owning side to null (unless already changed)
      if ($productBatch->getUser() === $this) {
        $productBatch->setUser(null);
      }
    }

    return $this;
  }

  public function getLand(): ?string
  {
    return $this->land;
  }

  public function setLand(string $land): static
  {
    $this->land = $land;

    return $this;
  }

  /**
   * @return Collection<int, CustomerTransaction>
   */
  public function getCustomerTransactions(): Collection
  {
    return $this->customerTransactions;
  }

  public function addCustomerTransaction(CustomerTransaction $customerTransaction): static
  {
    if (!$this->customerTransactions->contains($customerTransaction)) {
      $this->customerTransactions->add($customerTransaction);
      $customerTransaction->setUser($this);
    }

    return $this;
  }

  public function removeCustomerTransaction(CustomerTransaction $customerTransaction): static
  {
    if ($this->customerTransactions->removeElement($customerTransaction)) {
      // set the owning side to null (unless already changed)
      if ($customerTransaction->getUser() === $this) {
        $customerTransaction->setUser(null);
      }
    }

    return $this;
  }
}
