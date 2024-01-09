<?php

namespace App\Repository;

use App\Entity\ProductBatch;
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

//    /**
//     * @return ProductBatch[] Returns an array of ProductBatch objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('p.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?ProductBatch
//    {
//        return $this->createQueryBuilder('p')
//            ->andWhere('p.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
