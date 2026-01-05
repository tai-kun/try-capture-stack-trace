/**
 * 指定されたオブジェクトに現在のスタックトレースをキャプチャーするプロパティーを追加します。
 *
 * `Error.captureStackTrace()` を使用しますが、定義されていない場合は何もしません。
 *
 * @param targetObject スタックトレースを追加する対象のオブジェクトです。
 * @param constructorOpt スタックトレースから除外する関数の参照です。
 */
export default function tryCaptureStackTrace(
  targetObject: object,
  constructorOpt?: Function | undefined,
): void {
  if (typeof Error.captureStackTrace === "function") {
    Error.captureStackTrace(targetObject, constructorOpt);
  }
}
