<template>
<div>
    <div class="col-lg-12 control-section tooltip-menu">
        <ejs-tooltip ref="tooltip" target="#toolbar-menu button" :beforeOpen="onBeforeRender" :created='created' :width="170" cssClass="e-tooltip-menu-settings" opensOn="Click" id="tooltip-menu">
            <div class="toolbarContainer">
                <ejs-toolbar id='toolbar-menu'>
                    <e-items>
                        <e-item prefixIcon='e-copy-icon tb-icons' overflow='Hide' text='Wireless & networks' tooltipText='Wireless & networks'></e-item>
                        <e-item prefixIcon='e-copy-icon tb-icons' text='Device' overflow='Hide' tooltipText='Device'></e-item>
                        <e-item prefixIcon='e-copy-icon tb-icons' text='Personal' overflow='Hide' tooltipText='Personal'></e-item>
                    </e-items>
                </ejs-toolbar>
            </div>
            <ejs-listview ref="listview" id="tooltipMenu-list" :fields='fields' showIcon=true></ejs-listview>
        </ejs-tooltip>
    </div>
    <div id="action-description">
        <p>In this demo, the Tooltip has been customized to show the list of menu items.
        </p>
    </div>
    <div id="description">
        <p>
            Tooltip has been integrated with Listview component to display the Tooltip menu. With the help of
            <a href="https://ej2.syncfusion.com/vue/documentation/api/tooltip/#beforerender">
            beforeRender</a> event, dataSource for ListView changed and its instance assigned
            to
            <a href="https://ej2.syncfusion.com/vue/documentation/api/tooltip/#content">
            content</a> of Tooltip to appear like menu. On clicking the Toolbar items, the
            corresponding Tooltip menu will be opened.
        </p>
    </div>
</div>
</template>
<script>
import { TooltipComponent } from "@syncfusion/ej2-vue-popups";
import { ToolbarComponent, ItemDirective, ItemsDirective } from "@syncfusion/ej2-vue-navigations";
import { ListViewComponent } from "@syncfusion/ej2-vue-lists";
import { closest } from "@syncfusion/ej2-base";

export default {
  components: {
    'ejs-tooltip': TooltipComponent,
    'ejs-toolbar': ToolbarComponent,
    'e-item': ItemDirective,
    'e-items': ItemsDirective,
    'ejs-listview': ListViewComponent
  },
  data: function() {
    return {
      headerText0: {
        text: "Wireless & networks",
        iconCss: "e-copy-icon tb-icons",
        overflow: "Hide",
        tooltipText: "Wireless & networks"
      },
      headerText1: {
        text: "Device",
        iconCss: "e-copy-icon tb-icons",
        overflow: "Hide",
        tooltipText: "Device"
      },
      headerText2: {
        text: "Personal",
        iconCss: "e-copy-icon tb-icons",
        overflow: "Hide",
        tooltipText: "Personal"
      },
      width: 390,
      fields: {
        text: "Name",
        iconCss: "icon"
      },
      data1: [
        {
          Name: "WI-FI",
          id: "1",
          icon: "wifi"
        },
        {
          Name: "Bluetooth",
          id: "2",
          icon: "bluetooth"
        },
        {
          Name: "SIM cards",
          id: "3",
          icon: "sim"
        }
      ],
      data2: [
        {
          Name: "Display",
          icon: "display"
        },
        {
          Name: "Sound",
          icon: "sound"
        },
        {
          Name: "Battery",
          icon: "battery"
        },
        {
          Name: "Users",
          icon: "user"
        }
      ],
      data3: [
        {
          Name: "Location",
          icon: "location"
        },
        {
          Name: "Security",
          icon: "security"
        },
        {
          Name: "Language",
          icon: "language"
        }
      ]
    };
  },
  methods: {
    datatemplate: function() {
      return {
        template: listtemplateVue
      };
    },
    created: function() {
      if (document.getElementById("right-pane")) {
        document
          .getElementById("right-pane")
          .addEventListener("click", this.onClick);
        document
          .getElementById("right-pane")
          .addEventListener("scroll", this.onScroll);
      }
    },
    onClick: function(args) {
      let targetEle;
      if (args) {
          targetEle = closest(args.target, '.e-toolbar-item');
      }
      if (!targetEle) {
        if (
          this.$refs.tooltip &&
          document.getElementsByClassName("e-tooltip-wrap").length > 0
        ) {
          this.$refs.tooltip.close();
        }
      }
    },
    onScroll: function() {
      if (
        this.$refs.tooltip &&
        document.getElementsByClassName("e-tooltip-wrap").length > 0
      ) {
        this.$refs.tooltip.close();
      }
    },
    onBeforeRender: function(args) {
      let data = [
        {
          title: "Wireless & networks",
          data: this.data1
        },
        {
          title: "Device",
          data: this.data2
        },
        {
          title: "Personal",
          data: this.data3
        }
      ];
      for (let i = 0; i < data.length; i++) {
        if (data[i].title === args.target.parentElement.getAttribute("title")) {
          this.$refs.listview.ej2Instances.dataSource = data[i].data;
          this.$refs.tooltip.ej2Instances.content = this.$refs.listview.$el;
        }
      }
    }
  }
}
</script>
<style>
@font-face {
  font-family: "tb-tooltip-icons";
  src: url(data:application/x-font-ttf;charset=utf-8;base64,AAEAAAAKAIAAAwAgT1MvMj0gSTAAAAEoAAAAVmNtYXDoMOjqAAACDAAAAHhnbHlmGqxG9QAAAswAAA+gaGVhZA4Hp6IAAADQAAAANmhoZWEHmAOKAAAArAAAACRobXR4iND//QAAAYAAAACMbG9jYULoRtoAAAKEAAAASG1heHABOwBdAAABCAAAACBuYW1lgkwdCwAAEmwAAAIlcG9zdJZeEVUAABSUAAACGAABAAADUv9qAFoEAP/9//wD7AABAAAAAAAAAAAAAAAAAAAAIwABAAAAAQAALyEwDF8PPPUACwPoAAAAANWAMWoAAAAA1YAxav/9AAAD7APpAAAACAACAAAAAAAAAAEAAAAjAFEADgAAAAAAAgAAAAoACgAAAP8AAAAAAAAAAQPpAZAABQAAAnoCvAAAAIwCegK8AAAB4AAxAQIAAAIABQMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUGZFZABA5wDnIQNS/2oAWgPpAJYAAAABAAAAAAAABAAAAAPoAAAD6AAAA+j//QPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAD6AAAA+gAAAPoAAAAAAACAAAAAwAAABQAAwABAAAAFAAEAGQAAAAEAAQAAQAA5yH//wAA5wD//wAAAAEABAAAAAEAAgADAAQABQAGAAcACAAJAAoACwAMAA0ADgAPABAAEQASABMAFAAVABYAFwAYABkAGgAbABwAHQAeAB8AIAAhACIAAAAAADIAXADcARoBQgGGAa4B5AIGAnACigK2AxwDRgOAA7QDzAQOBE4EcgTyBRwFbAWSBawGGAZQBnYGrAbqBwQHZAeaB9AABwAAAAAD6QPoAAMABwAKAA4AEgAVABkAADchNSElITUhJTkBBSE1ITUhNSEFFxEnITUhAQPo/BgBtQIz/c3+SwG1AjP9zQIz/c3+S/r6A+j8GAFefV67P159Xvr6AfScXgAAAAIAAAAAA+kD6QAEABQAACUhNxc3AREeARchPgE3ES4BJyEOAQN6/PbCjML9gQE/LwMKLz8BAT8v/PYvP6j6p/oBhfz2Lz8BAT8vAwovPwEBPwAAAAL//QAAA+wD6QALAFAAAAEOAQcuASc+ATceAQEHBgcnJgYPAQYWHwEUBhQWFQcGHwEeAT8BFh8BFhczMjY/ATY3FxY2PwE2Ji8BNjUuATU3Ni8BLgEPASYvAS4BKwEiBgKnAmRNTGUBAWVMTWT+0BUtKn8KEQRmBgUGbgMDbBALZwQSCIAoLxQFFcwKDQMULSqACREEZgQDBnADAQJrEAtmBBIJfygvEgIOCswKDQH1S2ICAmJLS2ICAmIBlYUTHzIEBgisCBIGUw0YGhgNUwwUrAgGBDIfE4UTAQwIhRMfMgQGCKwIEgZTFxsNGA1TDBSsCAYEMh8ThQgMDAAAAAADAAAAAAPpA80ACwAOAB8AACUeARc+ATcuAScOASchAScXAQYUFwEeATI2NwE2NCcBAwsBPy8vPwEHYQcHYYH96gEL04X+4hkZATIMHx4eDQEyGRn+D4wvPwEBPy89gAUFgNkBCtOF/uIaQhn+zw0MDA0BMRlCGgHxAAAABQAAAAAD6QPoAAMABwALAA8AEwAANyE1ITchNSEnITUhNyE1ISchNSEBA+j8GN4CLP3U3gPo/BjeAiz91N4D6PwYAV6AW5xefFuAXgAAAAAEAAAAAAPpA+kACQATABcAJwAAAQcVMzcXMzUjLwEjFTMbATM1IwElESERBxEeARchPgE3ES4BJyEOAQFgo8ObnnVPxOp1npvqTin+8QGW/NReAT8vAwovPwEBPy/89i8/AQIDI5aWI7cGJQEr/tUlAVJ9/NQDLBH89i8/AQE/LwMKLz8BAT8AAgAAAAADiwPpAAMAFQAANyE1IRMeARc+ATcRIxEOAQcuAScRI18DLPzUSgS8jIy8BIsCbVJSbQKLAX0BsI+9BAS8jQG+/kVSbQICbVIBuwAFAAAAAAPpA8wAAgAFAA0AFwAaAAAlNyMBIzcBMzczFzMDIwUhARUhNSEBNSElMycB+HDkAcC+X/78Wi36LVrcUP1HAR/+3gGh/tQBJf5pAX7och1tARP//jt4eAIzTv5cPk0BpD9QcwAAAAABAAAAAAPpAt0AEAAAEyEnPgEzHgEXNyYkJw4BBycBAbWyM4BIhscodTX+/K5hq0WwAQ26LjMCnH0opM0EAUc/ugAAAAYAAAAAA+gD6QALABQAHQApAC0APQAAAR4BFz4BNy4BJw4BJR4BMjY0JiIGJR4BMjY0JiIGBR4BFz4BNy4BJw4BJREhEQcRHgEXIT4BNxEuASchDgEB1gFGNTVHAQFGNjVG/sYBIzUkJDUjAfMBNVA1NVA1/qgBPi4vPQEBPS8uPgJQ/NReATgoAyYoOAEBOCj82ig4AVk1RwEBRzU1RgICRgkaJCQ1IyPfKDQ0UDU1GC4+AQE+Li89AQE9u/zUAywD/NooOAEBNykDJik3AQE3AAAAAgAAAAADqgPpAAMACgAANyE1IQEjCQEjESFAA2r8lgEE6wGcAZzr/p4BfQIK/mQBnAFhAAYAAAAAA+kD6AADAAcACwAPABIAFgAANyE1ISUhNSE1ITUhNSE1KQERNwMhNSEBA+j8GAG1AjP9zQIz/c0CM/3N/kv6+gPo/BgBXn1efF59Xv4M+gGWXgAFAAAAAAPoA+gABwAUACoALgA+AAABFT4BNyMOAQUeATM1BicuATcnBhYBIgYHFz4BMzEyFzMXFhczLgEnJiMiJREhEQcRHgEXIT4BNxEuASchDgECH4CgDvEHHf7JM3pBKCEVCAurUQsBSThtMakKGxAkHAMDHAnuDqB+FRQGAZn81F4BOCgDJig4AQE4KPzaKDgBkPMPqHsVIZgyMvECIBdAGq1o/wHpJimqBgoVAxcnerERBD781AMsA/zaKDgBATcpAyYoOAEBOAACAAAAAAPpA+AADQAUAAATBhQfAR4BPwEVITUhATcJATY0LwErKiqvECoQNQKQ/Xv+20EBPAGOKyvTAZYtdSywDgENNCNeASRB/sQBkS10LdQAAAAGAAAAAAPpA+kAAwAPABMAHQAhACcAADchNSEjMxUjFTMVIxUzNSM3ITUhIzMHFTM1Izc1IzchNSEnMxUzNSP7Au79Evp9Pj59u7v6Au79Evp4eLt4eLv6Au79Evo/Pn1fXR8+Hz/6215+Pj5+PrxdH7v6AAUAAAAAA+kD0AACAAUADQAXABoAACU3IwMjNwEzNzMXMwMjBSEBFSE1IQE1ISczJwH4cOQevmD++Vot/C5c3lABZQEl/tsBpP7RASX+ZsPochpzARj//jZ4eAI2UP5ZP04BqT9NcwAAAQAAAAADoQPpAAsAAAEzAyMVITUjEzM1IQFmnfPIAjyd88j9xAMT/cTW1gI81gAABgAAAAAD6QPJAAMADAAQABkAHQAmAAA3ITUhBx4BMjY0JiIGEyE1IQceATI2NCYiBhMhNSEHHgEyNjQmIgb7Au79EvoBLEMrK0Ms+QLu/RL6ASxDKytDLPkC7v0S+gEsQysrQyxAXS8hLCxDLCwBRl4vIiwsQywsASddLiIsLEMsLAAAAwAAAAADjgPpAAcAEAAmAAABFSE1MxEhESUUBiImNDYyFicjDgEHER4BFyE+ATcRLgEnIy4BIgYBEgHGW/2EAWsaJhoaJhqsvyczAQEzJwJ8JzMBATMnvw5EWkQDM4iI/SkC1y4UGRknGhoaATMn/SknMwEBMycC1yczASgyMgABAAAAAAPpAt0AEQAAATEuAScGBAcXPgE3HgEXByERAzpGq2Gu/vw1dSjHhkiAM7IBtQIjP0cBBM2kKH2cAwEzLroB0AAAAAAOAAAAAAPpA+gAAgAFAAgACwAQABQAFwAbAB4AIQApAC0AMQBBAAABETclFzUXNyMFNyETFQUhEQEhJRMlMycFMSEnBzcnBxcRBRMDBSUDEy0BEQMlIwUDEQcRHgEXIT4BNxEuASchDgECDsj+ZaG3L5b+wc7+4TUBCv6FAy3+ggEKdP1S3JkBCwEjWemWlvrIATJ0dP7n/up3dwEWAZhy/vQ0/vZxXwE/LwMKLz8BAT8v/PYvPwG7/t9ZJDvfQGTLy/71A3EBgf5/bwEfHZmZy6SZNwjLAR4//uf+53d3ARkBGXcF/nIBHXFx/vIBfxD89i8/AQE/LwMKLz8BAT8ABQAAAAAD6QPoAAMABwALAA8AEwAANyE1ISUhNSElITUhJSE1ISUhNSEBA+j8GAFYApD9cP6oA+j8GAFYApD9cP6oA+j8GAFegFucXnxefV4AAAAACgAAAAAD6QPoAAMABwALAA8AEwAXABsAHwAjADMAAAEVIzUjFSM1IxUjNQEVIzUjFSM1IxUjNSUVIzUjFSM1IxUjNScRHgEXIT4BNxEuASchDgEDi/o+2z7bAyz6Pts+2wMs+j7bPtteARwVA4QVHAEBHBX8fBUcARq9vbu7u7sBGtvb29vb2/q8vLy8vLyG/IIXHQEBHRcDfhcdAQEdAAUAAAAAA+kD6AADAAcACwAPABMAADchNSE1ITUhNSE1ITUhNSE1ITUhAQPo/BgCkP1wA+j8GAKQ/XAD6PwYAV6BV59efFuAXgAAAAADAAAAAAPpA0IAAwAHAAsAADchNSE1ITUhNSE1IQED6PwYA+j8GAPo/Biob6dvpm8AAAAABQAAAAAD6QPpAAgAEQAaAB8AQAAAJQ4BIiY0NjIWExQGIiY0NjIWAw4BIiY0NjIWHwEBNSMFHgEXNjcXByYHDgEHHgEXPgE3Jic3ATM1ATYnLgEnDgEBLQE5VDk5VDniDhYODhYO4QE5VDk5VDn7ZAFelvyuAnFVLSZ1dSYtVXECAnFVVXECARB1AV6W/ZcSAQJxVVVxySo5OVQ5OQECCw4OFg4OASEqOTlUOTnAZAFeMpZVcQIBEHV1EgECcVVVcQICcVUtJnX+ojICaSYtVXECAnEAAAAAAwAAAAADTAOqAAcADwAfAAABHgEUBgcjNRMeARQGByM1AyE+ATcuAScxPgE3LgEnIQI9KjU4J+DAKjU1KsDAAcNnhAIBTD0vOgEDj27+cAGXATRRNAG7AXcBNFE0Abv9MgKGZUdwHh9dMmyMAgAAAAUAAAAAA+kD6AADAAcACwAPABMAADchNSE1ITUhNSE1ITUhNSE1ITUhAQPo/BgD6PwYA+j8GAPo/BgD6PwYAV59XpxefF59XgAAAAABAAAAAAPJA8kAHAAAExYAFz4BNxcRIRcOAQcuASc+ATceARczLgEnBgAgBQEIyGGqQIr+ZrsvfkmVxwQEx5V0siV7KvSoyP74AfXG/vYFAUlAigGauzE4AQTHlZXHBAKAaZvCAwX+9gAAAAACAAAAAAPnA+kACwAhAAABDgEHLgEnPgE3HgEFHgEXPgE3FxUBNwEjJz4BNS4BJw4BAnUCkW1ukAMDkG5tkf2PBNGeRXsyDgEdVv7jLg4rLQTQnp7RAndukAMDkG5tkAMDkG2e0QQBLikRLf7jVQEgDjJ6R53RBATRAAAAAgAAAAADqgPpAAMACgAANyE1IRMzESERMwFAA2r8lg7zAWjz/lkBfQHN/p0BYwGeAAAAAAUAAAAAA+kD6QAIABEAGgAjADkAAAEOASImNDYyFgUOASImNDYyFiUOASImNDYyFgUUBiImNDYyFgEWABc+ATU0Jic+ATczPgE3JiQnBgADegEuSS4uSS79ngEuSS4uSS4BvQEuSC8vSC7+6y9ILi5IL/5EBQEb1CQvKwEBLiRkdp0DBf7l1NT+5QJIJC4uSC8uJSQuLkgvLrolLi5JLi4kJS4uSS4u/qrU/uUFAS4kIisiJS4BA511vfsFBf7lAAIAAAAAA+kDqgAIACAAAAEXIRUhBxc3JyURHgEzITI2NzUjFSERIRUzNS4BIyEiBgLKdf5NAbByP+Dg/PgBNCcBzyc0AVz+MgHOXAE0J/4yKDQClXRZcz7e3oD9RCUyMiXMzAK8zMwlMjIAAAMAAAAAA6QD6QADABMAHAAAAREhEQcRHgEXIT4BNxEuASchDgEnETMRITUhDgEDSv4MWwEzJwH0JjQBATQm/gwnM7dZAhL97iYyAtj9hAJ8Bf2IJjMBATMmAngmNAEBNJX9hAJ8WwEzAAAAAAAAEgDeAAEAAAAAAAAAAQAAAAEAAAAAAAEABwABAAEAAAAAAAIABwAIAAEAAAAAAAMABwAPAAEAAAAAAAQABwAWAAEAAAAAAAUACwAdAAEAAAAAAAYABwAoAAEAAAAAAAoALAAvAAEAAAAAAAsAEgBbAAMAAQQJAAAAAgBtAAMAAQQJAAEADgBvAAMAAQQJAAIADgB9AAMAAQQJAAMADgCLAAMAAQQJAAQADgCZAAMAAQQJAAUAFgCnAAMAAQQJAAYADgC9AAMAAQQJAAoAWADLAAMAAQQJAAsAJAEjIE5ld0ljb25SZWd1bGFyTmV3SWNvbk5ld0ljb25WZXJzaW9uIDEuME5ld0ljb25Gb250IGdlbmVyYXRlZCB1c2luZyBTeW5jZnVzaW9uIE1ldHJvIFN0dWRpb3d3dy5zeW5jZnVzaW9uLmNvbQAgAE4AZQB3AEkAYwBvAG4AUgBlAGcAdQBsAGEAcgBOAGUAdwBJAGMAbwBuAE4AZQB3AEkAYwBvAG4AVgBlAHIAcwBpAG8AbgAgADEALgAwAE4AZQB3AEkAYwBvAG4ARgBvAG4AdAAgAGcAZQBuAGUAcgBhAHQAZQBkACAAdQBzAGkAbgBnACAAUwB5AG4AYwBmAHUAcwBpAG8AbgAgAE0AZQB0AHIAbwAgAFMAdAB1AGQAaQBvAHcAdwB3AC4AcwB5AG4AYwBmAHUAcwBpAG8AbgAuAGMAbwBtAAAAAAIAAAAAAAAACgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIwECAQMBBAEFAQYBBwEIAQkBCgELAQwBDQEOAQ8BEAERARIBEwEUARUBFgEXARgBGQEaARsBHAEdAR4BHwEgASEBIgEjASQAEFRleHRfT3V0ZGVudF8wMDELUGljdHVyZV8wMDEMU2V0dGluZ3NfMDAxEENvbG9yX3BpY2tlcl8wMDIQQWxpZ25fQ2VudGVyXzAwNghMaW5lXzAwMQ1VbmRlcmxpbmVfMDAxDFNvcnRfWi1BXzAwMQhVbmRvXzAwMRBDaGFydF9idWJibGVfMDAxC0Rvd25sb2FkXzAwD1RleHRfaW5kZW50XzAwMRJDaGFydF9Eb3VnaG51dF8wMDEJQ2xlYXJfMDAyDU51bWJlcmluZ18wMDEMU29ydF9BLVpfMDAxCkl0YWxpY18wMDELQnVsbGV0c18wMDEJUGFzdGVfMDAxCFJlZG9fMDAxD0NoYXJ0X3JhZGFyXzAwMQ9BbGlnbl9SaWdodF8wMDEJVGFibGVfMDAxDkFsaWduX0xlZnRfMDAxCE1lbnVfMDAxB0N1dF8wMDIIQm9sZF8wMDERQWxpZ25fSnVzdGlmeV8wMDEKUmVsb2FkXzAwMQpTZWFyY2hfMDAxClVwbG9hZF8wMDEKRGVzaWduXzAwNQpFeHBvcnRfMDAxCENvcHlfMDAyAAA=);
  font-weight: normal;
  font-style: normal;
}

.e-bigger .tooltip-menu .toolbarContainer #toolbar-menu .e-tbar-btn .tb-icons {
  font-size: 18px;
}

.e-tooltip-menu-settings.e-tooltip-wrap .e-tip-content {
  padding: 3px;
}

.tooltip-menu .toolbarContainer #toolbar-menu .e-tbar-btn .tb-icons {
  font-family: "tb-tooltip-icons";
  font-size: 16px;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
}

.tooltip-menu .toolbarContainer #toolbar-menu .e-copy-icon:before {
  content: "\e721";
}

.tooltip-menu .toolbarContainer #toolbar-menu {
  margin: 0 auto;
  background: transparent;
  display: inline-block;
}

.toolbarContainer {
  text-align: center;
}

.e-tooltip-menu-settings #tooltipMenu-list .e-list-item:last-child {
  border-bottom: 0;
}

.highcontrast
  .e-tooltip-menu-settings.e-tooltip-wrap
  .e-arrow-tip-inner.e-tip-top {
  color: #333 !important;
}

.e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip-inner.e-tip-top {
  color: white;
}

.e-tooltip-menu-settings.e-tooltip-wrap.e-popup {
  background: none;
  border-radius: 0px;
}

.material .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.bootstrap .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.tailwind .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.tailwind-dark .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.fabric-dark .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.bootstrap5 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.bootstrap5\.3 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.highcontrast .e-tooltip-menu-settings.e-tooltip-wrap.e-popup {
  border: 1px solid #dddddd;
}

.material .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip-outer.e-tip-top,
.bootstrap
  .e-tooltip-menu-settings.e-tooltip-wrap
  .e-arrow-tip-outer.e-tip-top {
  border-bottom: 8px solid #dddddd;
}

.material-dark .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip-outer.e-tip-top {
    border-bottom: 6px solid rgb(238, 238, 238);
}
    
.fabric-dark .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip-outer.e-tip-top {
    border-bottom: 6px solid rgb(244, 244, 244);
}
    
.bootstrap-dark .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip-outer.e-tip-top {
    border-bottom: 6px solid rgb(80, 80, 80);
}
    
.tailwind-dark .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip.e-tip-top {
    top: -9px !important;
}

.highcontrast .e-tooltip-menu-settings #tooltipMenu-list .e-list-item.e-hover {
  border-color: transparent;
}

.fabric .e-tooltip-menu-settings.e-tooltip-wrap .e-arrow-tip.e-tip-top {
  top: -8px !important;
}

.highcontrast
  .e-tooltip-menu-settings.e-tooltip-wrap
  .e-arrow-tip-outer.e-tip-top {
  border-bottom: 6px solid #dddddd;
}

.fabric .e-tooltip-menu-settings.e-tooltip-wrap.e-popup {
  background: white;
}

.highcontrast .e-tooltip-menu-settings.e-tooltip-wrap.e-popup {
  background: #333;
}

@media screen and (max-width: 420px) {
  .e-bigger .tooltip-menu .toolbarContainer {
    width: 75%;
    overflow: auto;
    margin: auto;
  }
}

@font-face {
  font-family: "e-tooltip-menu-icons";
  src: url(data:application/x-font-ttf;charset=utf-8;base64,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);
  font-weight: normal;
  font-style: normal;
}

.e-tooltip-menu-settings #tooltipMenu-list .e-list-icon {
  float: right;
  height: inherit;
  margin-left: 14px;
  padding-left: 29px;
  font-size: 14px;
  font-family: "e-tooltip-menu-icons";
}

.e-tooltip-menu-settings #tooltipMenu-list .wifi:before {
  content: "\e700";
}

.e-tooltip-menu-settings #tooltipMenu-list .bluetooth:before {
  content: "\e702";
}

.e-tooltip-menu-settings #tooltipMenu-list .sim:before {
  content: "\e705";
}

.e-tooltip-menu-settings #tooltipMenu-list .display:before {
  content: "\e704";
}

.e-tooltip-menu-settings #tooltipMenu-list .sound:before {
  content: "\e703";
}

.e-tooltip-menu-settings #tooltipMenu-list .battery:before {
  content: "\e711";
}

.e-tooltip-menu-settings #tooltipMenu-list .user:before {
  content: "\e707";
}

.e-tooltip-menu-settings #tooltipMenu-list .location:before {
  content: "\e708";
}

.e-tooltip-menu-settings #tooltipMenu-list .security:before {
  content: "\e709";
}

.e-tooltip-menu-settings #tooltipMenu-list .language:before {
  content: "\e710";
}

.bootstrap4 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup,
.tailwind .e-tooltip-menu-settings.e-tooltip-wrap.e-popup {
  border-color: rgba(0, 0, 0, .15);
}

.bootstrap4 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview,
.bootstrap5 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview,
.bootstrap5\.3 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview,
.tailwind .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview,
.tailwind-dark .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview,
.fabric-dark .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-listview {
  border: 0;
}

.bootstrap4 .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-arrow-tip-outer.e-tip-top,
.tailwind .e-tooltip-menu-settings.e-tooltip-wrap.e-popup .e-arrow-tip-outer.e-tip-top {
  border-bottom: 6px solid rgba(0, 0, 0, .15);
}

.fluent2 #tooltipMenu-list .e-list-icon, 
.fluent2-dark #tooltipMenu-list .e-list-icon {
    padding-left: 10px;
    margin-top: 4px;
}

#tooltip-menu .e-listview {
    border: 0px;
}

</style>
