import csv
import sys

with open('airpollution.csv') as File:
    reader = csv.reader(File)
    sys.stdout.write("[")
    count = 0
    for row in reader:
        if(count>0):
            sys.stdout.write(","+row[2]+","+row[3]+","+str(float(row[4])*0.1))
        count += 1
    sys.stdout.write("]")
