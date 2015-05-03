t rev-list --reverse HEAD | while read rev; do echo; echo REV $rev; git ls-tree -r $rev | awk '{print $3}' | xargs git show | cat; done | view -
:save stats.sh

