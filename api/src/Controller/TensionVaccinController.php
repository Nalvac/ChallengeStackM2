<?php

namespace App\Controller;

use App\Repository\CustomerTransactionRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TensionVaccinController extends AbstractController
{
    #[Route('/api/best/vaccin', name: 'get_best_vaccin', methods: ['GET'])]
    public function getBestVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer): JsonResponse
    {
      $bestVaccin = $customerTransactionRepository->findBestVaccin();

      $data = $serializer->serialize($bestVaccin, 'json');
      return new JsonResponse($data, 200, [], true);
    }

    #[Route('/api/tension/vaccin', name: 'get_tension_vaccin', methods: ['POST'])]
    public function getTensionVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $date = $jsonData['deliveryDate'];
      $product = $jsonData['productId'];

      $tensionVaccin = $customerTransactionRepository->findVaccinByQuantityByDate($product, $date);

      $res = $serializer->serialize($tensionVaccin, 'json');

      return new JsonResponse($res, 200, [], true);
    }

}
