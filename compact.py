import sys
for line in open('source.js', 'r').readlines():
  sys.stdout.write(line.strip() + ' ')
print "\n"
for line in open('autoload_source.js', 'r').readlines():
  sys.stdout.write(line.strip() + ' ')
