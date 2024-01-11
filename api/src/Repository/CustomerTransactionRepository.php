<?php

namespace App\Repository;

use App\Entity\CustomerTransaction;
use App\Entity\Product;
use App\Entity\ProductBatch;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CustomerTransaction>
 *
 * @method CustomerTransaction|null find($id, $lockMode = null, $lockVersion = null)
 * @method CustomerTransaction|null findOneBy(array $criteria, array $orderBy = null)
 * @method CustomerTransaction[]    findAll()
 * @method CustomerTransaction[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CustomerTransactionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CustomerTransaction::class);
    }

//    /**
//     * @return CustomerTransaction[] Returns an array of CustomerTransaction objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CustomerTransaction
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }

    public function findBestVaccin(): array
    {
      $qb = $this->createQueryBuilder('ct');

      $qb->select('SUM(ct.quantity) as quantite', 'p.name', 'p.brand')
        ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
        ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
        ->groupBy('p.id')
        ->orderBy('quantite', 'DESC')
        ->setMaxResults(1);

      return $qb->getQuery()->getSingleResult();
    }

    public function findVaccinByQuantityByDate(array $productIds, string $deliveryDates)
    {
      $qb = $this->createQueryBuilder('ct');

      // Convertit les dates en chaînes LIKE si nécessaire
      $dateLikes = $deliveryDates . '%';


      $qb->select('SUM(ct.quantity) as quantite', 'p.name', 'p.brand', 'ct.deliveryDate')
        ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
        ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
        ->where($qb->expr()->in('p.id', ':productIds'))
        ->andWhere($qb->expr()->like('ct.deliveryDate', ':dateLikes'))
        ->setParameter('productIds', $productIds)
        ->setParameter('dateLikes', $dateLikes)
        ->groupBy('p.id, ct.deliveryDate')
        ->orderBy('ct.deliveryDate', 'ASC', 'p.id', 'ASC');

      return $qb->getQuery()->getResult();
    }
}
