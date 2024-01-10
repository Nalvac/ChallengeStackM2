<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    private ?string $mail = null;

    #[ORM\Column(length: 255)]
    private ?string $phone = null;

    #[ORM\Column]
    private ?int $zip_code = null;

    #[ORM\Column(length: 255)]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    private ?string $adress = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $password = null;

    #[ORM\ManyToOne(inversedBy: 'user')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Role $roles = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: ProductBatch::class)]
    private Collection $productBatches;

    #[ORM\Column(length: 255)]
    private ?string $land = null;

    public function __construct()
    {
        $this->productBatches = new ArrayCollection();
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

    public function getZipCode(): ?int
    {
        return $this->zip_code;
    }

    public function setZipCode(int $zip_code): static
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
}
