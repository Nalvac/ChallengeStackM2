<?php

// src/Controller/ProductBatchController.php

namespace App\Controller;

use App\Entity\ProductBatch;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class ProductBatchController extends AbstractController
{
  #[Route('/product_batches', name: 'get_all_product_batches', methods: ['GET'])]
  public function getAllProductBatches(SerializerInterface $serializer): JsonResponse
  {
    $productBatchRepository = $this->getDoctrine()->getRepository(ProductBatch::class);

    $productBatches = $productBatchRepository->findAllWithAssociations();

    $jsonData = $serializer->serialize($productBatches, 'json', ['groups' => ['getProductBatch']]);


    $response = new JsonResponse($jsonData, 200, [], true);

    return $response;
  }
}
