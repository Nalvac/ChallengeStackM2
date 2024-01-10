<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductBatchRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductBatchRepository::class)]
#[ApiResource]
class ProductBatch
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getProductBatch'])]
    private ?int $id = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['getProductBatch'])]
    private ?\DateTimeInterface $dateExp = null;

    #[ORM\Column]
    #[Groups(['getProductBatch'])]
    private ?int $quantity = null;

    #[ORM\ManyToOne(inversedBy: 'productBatches')]
    #[ORM\JoinColumn(nullable: false)]
    private ?Product $product = null;

    #[ORM\ManyToOne(inversedBy: 'productBatches')]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: 'productBatch', targetEntity: CustomerTransaction::class)]
    private Collection $customerTransactions;

    public function __construct()
    {
        $this->customerTransactions = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getDateExp(): ?\DateTimeInterface
    {
        return $this->dateExp;
    }

    public function setDateExp(\DateTimeInterface $dateExp): static
    {
        $this->dateExp = $dateExp;

        return $this;
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

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;

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
            $customerTransaction->setProductBatch($this);
        }

        return $this;
    }

    public function removeCustomerTransaction(CustomerTransaction $customerTransaction): static
    {
        if ($this->customerTransactions->removeElement($customerTransaction)) {
            // set the owning side to null (unless already changed)
            if ($customerTransaction->getProductBatch() === $this) {
                $customerTransaction->setProductBatch(null);
            }
        }

        return $this;
    }
}
