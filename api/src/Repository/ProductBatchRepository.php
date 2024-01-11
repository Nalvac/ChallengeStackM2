<?php

namespace App\Repository;

use App\Entity\ProductBatch;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<ProductBatch>
 *
 * @method ProductBatch|null find($id, $lockMode = null, $lockVersion = null)
 * @method ProductBatch|null findOneBy(array $criteria, array $orderBy = null)
 * @method ProductBatch[]    findAll()
 * @method ProductBatch[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ProductBatchRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, ProductBatch::class);
    }

  public function findBestSupplier(string $localisation): array
  {
    $qb = $this->createQueryBuilder('pb');

    $qb->select('SUM(pb.quantity) as quantite', 'user.name')
      ->innerJoin(User::class, 'user', 'WITH', 'user.id = pb.user')
      ->where('user.city = :localisations')
      ->setParameter('localisations', $localisation)
      ->groupBy('user.id')
      ->orderBy('quantite', 'DESC');

    return $qb->getQuery()->getResult();
  }

  public function getAllStockProductBatchByProductId(int $productId): array
  {
    $qb = $this->createQueryBuilder('pb');

    $qb->select('SUM(pb.quantity) as quantite')
      ->where('pb.product = :productId')
      ->setParameter('productId', $productId);

    return $qb->getQuery()->getSingleResult();
  }
}
