import csv
import sys

with open('data.csv') as File:
    reader = csv.reader(File)
    sys.stdout.write("[")
    count = 0
    for row in reader:
        if(count>0):
            sys.stdout.write(","+row[8]+","+row[9]+","+str(float(row[6])*0.001))
        count += 1
    sys.stdout.write("]")
