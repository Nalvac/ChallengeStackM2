<?php

namespace App\Repository;

use App\Entity\CustomerTransaction;
use App\Entity\Product;
use App\Entity\ProductBatch;
use App\Entity\Role;
use App\Entity\User;
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

    public function findVaccinByQuantityByLocalisation(array $productIds, array $localisations)
    {
      $qb = $this->createQueryBuilder('ct');

      $qb->select('SUM(ct.quantity) as quantite', 'p.name', 'p.brand', 'user.city', 'user.land')
        ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
        ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
        ->innerJoin(User::class, 'user', 'WITH', 'user.id = ct.user')
        ->where($qb->expr()->in('p.id', ':productIds'))
        ->andWhere($qb->expr()->in('user.city', ':localisations'))
        ->setParameter('productIds', $productIds)
        ->setParameter('localisations', $localisations)
        ->groupBy('p.id, user.city')
        ->orderBy('user.city', 'ASC', 'p.id', 'ASC');

      return $qb->getQuery()->getResult();
    }

  public function findBestVaccinByLocalisation(array $city): array
  {
    $qb = $this->createQueryBuilder('ct');

    $qb->select('SUM(ct.quantity) as quantite', 'p.name', 'p.brand')
      ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
      ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
      ->innerJoin(User::class, 'user', 'WITH', 'user.id = ct.user')
      ->where($qb->expr()->in('user.city', ':localisations'))
      ->setParameter('localisations', $city)
      ->groupBy('p.id')
      ->orderBy('quantite', 'DESC')
      ->setMaxResults(1);

    return $qb->getQuery()->getSingleResult();
  }

  public function getCommandByOfficineId(string $officineId): array
  {
    $qb = $this->createQueryBuilder('ct');

    $qb->select('p.name as product_name', 'p.brand',  'ct.quantity', 'ct.deliveryDate', 'user.name')
      ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
      ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
      ->innerJoin(User::class, 'user', 'WITH', 'user.id = ct.user')
      ->innerJoin(Role::class, 'r', 'WITH', 'r.id = user.roles')
      ->where('r.role = :role')
      ->andWhere('user.id = :officineId')
      ->setParameter('role', 'Officine')
      ->setParameter('officineId', $officineId)
      ->orderBy('ct.deliveryDate', 'DESC');


    return $qb->getQuery()->getResult();
  }

  public function getAllStockCustomerTransactionByProductId(int $idProduct): array
  {
    $qb = $this->createQueryBuilder('ct');

    $qb->select('SUM(ct.quantity) as quantite')
      ->innerJoin(ProductBatch::class, 'pb', 'WITH', 'pb.id = ct.productBatch')
      ->innerJoin(Product::class, 'p', 'WITH', 'p.id = pb.product')
      ->where('p.id = :idProduct')
      ->setParameter('idProduct', $idProduct);

    return $qb->getQuery()->getSingleResult();
  }
}
