#! /bin/bash
gcloud run deploy reader-api-v2 --image gcr.io/reader-lirio/reader-api-v2 --allow-unauthenticated --platform managed --region us-central1

