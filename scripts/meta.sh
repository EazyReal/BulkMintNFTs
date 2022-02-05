#!/bin/bash
mkdir data/meta
cd data/meta 
for i in {1..6666};
do
    wsl wget https://wallet-static.kryptogo.com/public/luckybag2022/meta/$i
done