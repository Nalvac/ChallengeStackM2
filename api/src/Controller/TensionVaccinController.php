<?php

namespace App\Controller;

use App\Repository\CustomerTransactionRepository;
use App\Repository\ProductBatchRepository;
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

    #[Route('/api/localisation/vaccin', name: 'get_localisation_vaccin', methods: ['POST'])]
    public function getLocalisationVaccin(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $product = $jsonData['productIds'];
      $city = $jsonData['city'];

      $localisationVaccin = $customerTransactionRepository->findVaccinByQuantityByLocalisation($product, $city);

      $res = $serializer->serialize($localisationVaccin, 'json');

      return new JsonResponse($res, 200, [], true);
    }

    #[Route('/api/localisation/best/vaccin', name: 'get_localisation_best_vaccin', methods: ['POST'])]
    public function getBestVaccinByLocalisation(CustomerTransactionRepository $customerTransactionRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $city = $jsonData['city'];

      $localisationBestVaccin = $customerTransactionRepository->findBestVaccinByLocalisation($city);

      $res = $serializer->serialize($localisationBestVaccin, 'json');

      return new JsonResponse($res, 200, [], true);
    }

    #[Route('/api/localisation/best/supplier', name: 'get_localisation_best_supplier', methods: ['POST'])]
    public function getBestSupplierByLocalisation(ProductBatchRepository $productBatchRepository, SerializerInterface $serializer, Request $request): JsonResponse
    {
      $data = $request->getContent();
      $jsonData = json_decode($data, true);

      $city = $jsonData['city'];

      $localisationBestSupplier = $productBatchRepository->findBestSupplier($city);

      $res = $serializer->serialize($localisationBestSupplier, 'json');

      return new JsonResponse($res, 200, [], true);
    }

}
