
# MD LINKS

Este repositorio contiene una aplicación cuya finalidad es la encontrar archivos Markdown, leerlos, extraer los links, validarlos (ver si son válidos o no) y entregar estadísticas sobre estos últimos.

Este proyecto se puede instalar mediante:
```bash
  npm install filletournesols/md-links
```
Para utilizar esta aplicación, el proyecto cuenta con comandos para poder implementar en la terminal.
Por ejemplo, si se utiliza `md-links ./carpeta/archivo.md` veremos reflejado en la consola la ruta del archivo con sus respectivos links. Si utilizamos `md-links ./carpeta/archivo.md --validate`, se le agrega un apartado a la respuesta en nuestra terminal y podremos ver si los links son válidos o no mediante una respuesta isValid: true o false. Otra flag que podemos utilizar es `--stats` (`md-links ./carpeta/archivo.md --stats`), este comando nos mostrará en consola el total de links que tenemos en el o los archivos que se le entregan mediante la ruta; esto se muestra con totalLinks:cantidad. Por último, podemos utilizar ambos comandos (`md-links ./carpeta/archivo.md--validate  --stats`) para poder ver el total de links, el total de links válidos y el de los inválidos; esto se muestra con totalLinks: cantidad, validLinks: cantidad, brokenLinks: cantidad.
En el caso de que la ruta que se le entrega en la terminal sea inválida, se muestra el mensaje “INVALID PATH”.