<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: ProductRepository::class)]
#[ApiResource]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['getProducts'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getProducts'])]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['getProducts'])]
    private ?string $brand = null;

    #[ORM\Column]
    #[Groups(['getProducts'])]
    private ?int $stock_alert = null;

    #[ORM\OneToMany(mappedBy: 'product', targetEntity: ProductBatch::class)]
    private Collection $productBatches;

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

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getBrand(): ?string
    {
        return $this->brand;
    }

    public function setBrand(string $brand): static
    {
        $this->brand = $brand;

        return $this;
    }

    public function getStockAlert(): ?int
    {
        return $this->stock_alert;
    }

    public function setStockAlert(int $stock_alert): static
    {
        $this->stock_alert = $stock_alert;

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
            $productBatch->setProduct($this);
        }

        return $this;
    }

    public function removeProductBatch(ProductBatch $productBatch): static
    {
        if ($this->productBatches->removeElement($productBatch)) {
            // set the owning side to null (unless already changed)
            if ($productBatch->getProduct() === $this) {
                $productBatch->setProduct(null);
            }
        }

        return $this;
    }
}
