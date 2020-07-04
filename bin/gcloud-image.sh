#! /bin/bash
gcloud config set project reader-lirio
docker image build -t api .
docker image tag api gcr.io/reader-lirio/reader-api-v2
docker push gcr.io/reader-lirio/reader-api-v2

