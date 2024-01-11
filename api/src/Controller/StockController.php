<?php

namespace App\Controller;

use App\Repository\CustomerTransactionRepository;
use App\Repository\ProductBatchRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class StockController extends AbstractController
{
    #[Route('/api/stock/{id}', name: 'app_stock', methods: ['GET'])]
    public function getAllStock(SerializerInterface $serializer, Request $request, ProductBatchRepository $productBatchRepository, CustomerTransactionRepository $customerTransactionRepository): JsonResponse
    {
      $stockBatch = $productBatchRepository->getAllStockProductBatchByProductId($request->get('id'));
      $stockTransaction = $customerTransactionRepository->getAllStockCustomerTransactionByProductId($request->get('id'));
      $currentStock = $stockBatch['quantite'] - $stockTransaction['quantite'];

      $data = $serializer->serialize($currentStock, 'json');

      return new JsonResponse($data, 200, [], true);
    }
}
