import sys
for line in open('source.js', 'r').readlines():
  sys.stdout.write(line.strip() + ' ')
