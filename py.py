import csv
import sys

with open('2000.csv') as File:
    reader = csv.reader(File)
    sys.stdout.write("[[2000,[")
    count = 0
    for row in reader:
        if(count>0):
            sys.stdout.write(","+row[0]+","+row[1]+","+str(float(row[2])*0.1))
        count += 1
    sys.stdout.write("]]]")
