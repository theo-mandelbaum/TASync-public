#!/bin/sh

#  Uninstall.sh
#
#
#  Created by labuser on 13/09/12.
#

# Delete the installed files location...

rm -r $HOME/Documents/Syncfusion/$PRODUCT_VERSION/JavaScript2

FILE_VERSION=""
DIR_VERSION="$HOME/Documents/Syncfusion/$PRODUCT_VERSION"
# init
# look for empty dir
if [ "$(ls -A $DIR_VERSION)" ]; then
echo ""
else
rm -r $DIR_VERSION
fi

FILE_SYNCFUSION=""
DIR_SYNCFUSION="$HOME/Documents/Syncfusion"
# init
# look for empty dir
if [ "$(ls -A $DIR_SYNCFUSION)" ]; then
echo "Take action $DIR is not Empty"
else
rm -r $DIR_SYNCFUSION
fi

# Delete the System Entries....

sudo pkgutil --forget com.synfusion.syncfusionElectron.ReadMe_$PRODUCT_VERSION.pkg
sudo pkgutil --forget com.synfusion.syncfusionElectron.Samples_$PRODUCT_VERSION.pkg
sudo pkgutil --forget com.synfusion.syncfusionElectron.Uninstall_$PRODUCT_VERSION.pkg

