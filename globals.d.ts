// Объявляем модули для CSS
declare module '*.css' {
  const content: string;
  export default content;
}
declare module "*.svg" {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
// globals.d.ts
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}