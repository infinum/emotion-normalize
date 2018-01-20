function remComm() {
   if ( !m )
      m = index($0, cs);

   if ( m && p = index($0, ce) ) {
      $0 = substr($0, 1, m-1) substr($0, p+2);
      if (m = index($0, cs))
         remComm();
   }
}
BEGIN {
   cs="/*";
   ce="*/";
   m = 0;
}
{
   remComm();
   if ( !m && NF )
      print;
}
